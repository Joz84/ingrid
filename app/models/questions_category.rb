class QuestionsCategory < ApplicationRecord
  has_many :questions
  validates :title, presence: true, uniqueness: true

  def self.visibles
    where(visible: true)
  end

  def visible_questions
    questions.visibles
  end

  def self.set_total_scores(answers_attrs)
    session_qids = answers_attrs.keys.map(&:to_i)
    all.map do |questions_category|
      category_qids = questions_category.questions.visibles.map(&:id)
      total_score = (category_qids & session_qids).size * 100 / category_qids.size
      [ questions_category.title, total_score ]
    end.to_h
  end

  def weighted_average(survey)
    survey.answers.filter_by_category(self).weighted_average
  end
end
