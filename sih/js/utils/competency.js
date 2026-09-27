// CAPACITY CONNECT - Competency Mapping Engine Algorithm

/**
 * Normalizes a skill string for fuzzy/exact token comparison
 */
function normalizeSkill(s) {
  return (s || '').toLowerCase().trim().replace(/[-_]/g, ' ');
}

/**
 * Calculates Competency Fit Score between a Subject requirement and a Trainer profile.
 * Formula:
 * - Skill Match (85% weight): Intersection of Trainer Skills and Subject Required Skills / Total Required Skills
 * - Experience Factor (15% weight): Ratio of Trainer experience vs min required experience
 * 
 * @param {Object} subject - The subject requiring a trainer
 * @param {Object} trainer - The candidate trainer
 * @returns {Object} detailed matching breakdown
 */
export function calculateTrainerSubjectFit(subject, trainer) {
  const reqSkills = (subject.requiredSkills || []).map(normalizeSkill);
  const trainerSkills = (trainer.skills || []).map(normalizeSkill);

  if (reqSkills.length === 0) {
    return {
      score: 100,
      matchedSkills: [],
      missingSkills: [],
      tier: 'High',
      tierColor: 'emerald',
      experienceRatio: 1.0
    };
  }

  // Find exact and partial token matches
  const matchedSkills = [];
  const missingSkills = [];

  subject.requiredSkills.forEach(req => {
    const normReq = normalizeSkill(req);
    const hasMatch = trainerSkills.some(ts => ts === normReq || ts.includes(normReq) || normReq.includes(ts));
    if (hasMatch) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const skillMatchRatio = matchedSkills.length / subject.requiredSkills.length;
  const skillScore = skillMatchRatio * 85;

  // Experience evaluation
  const minExp = subject.minExperienceYears || 3;
  let trainerExp = 5;
  if (typeof trainer.experience === 'number') {
    trainerExp = trainer.experience;
  } else if (typeof trainer.experience === 'string') {
    const match = trainer.experience.match(/\d+/);
    if (match) trainerExp = parseInt(match[0], 10);
  }

  const expRatio = Math.min(1.5, trainerExp / Math.max(1, minExp));
  const expScore = Math.min(15, (expRatio >= 1 ? 15 : expRatio * 15));

  const totalScore = Math.min(100, Math.round(skillScore + expScore));

  let tier = 'Low';
  let tierColor = 'rose';
  if (totalScore >= 80) {
    tier = 'High Match';
    tierColor = 'emerald';
  } else if (totalScore >= 50) {
    tier = 'Moderate Match';
    tierColor = 'amber';
  } else {
    tier = 'Low Match';
    tierColor = 'slate';
  }

  return {
    trainerId: trainer.id,
    trainerName: trainer.name,
    trainerDepartment: trainer.department,
    trainerAvatar: trainer.avatar,
    trainerExperience: trainer.experience,
    subjectId: subject.id,
    subjectName: subject.name,
    subjectCode: subject.code,
    score: totalScore,
    matchedSkills,
    missingSkills,
    matchedCount: matchedSkills.length,
    totalRequired: subject.requiredSkills.length,
    tier,
    tierColor,
    isCurrentlyAssigned: subject.assignedTrainerId === trainer.id
  };
}

/**
 * For a given subject, ranks all approved trainers from best to worst fit
 */
export function rankTrainersForSubject(subject, trainers) {
  const approvedTrainers = trainers.filter(t => t.role === 'trainer' && t.status === 'approved');
  const results = approvedTrainers.map(t => calculateTrainerSubjectFit(subject, t));
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Generates organizational competency matrix across all subjects
 */
export function generateCompetencyMatrix(subjects, trainers) {
  return subjects.map(subject => {
    const rankings = rankTrainersForSubject(subject, trainers);
    const topSuggestion = rankings[0] || null;
    const currentTrainer = trainers.find(t => t.id === subject.assignedTrainerId) || null;
    const currentTrainerFit = currentTrainer ? calculateTrainerSubjectFit(subject, currentTrainer) : null;

    return {
      subject,
      currentTrainer,
      currentTrainerFit,
      topSuggestion,
      allRankings: rankings,
      coverageGap: !subject.assignedTrainerId || (currentTrainerFit && currentTrainerFit.score < 50)
    };
  });
}
