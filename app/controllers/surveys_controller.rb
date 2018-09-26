class SurveysController < ApplicationController
  skip_before_action :authenticate_user!

  def new
    # redirect to survey show if session is not empty?
    @survey = Survey.new
    session[:answers_attributes] = {} if session[:answers_attributes].nil?
    @question_number = 0
    set_total_scores
  end

  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      @total_score = @survey.total_score
      @survey_result = @survey.survey_result(@total_score)
      # envoie du mail
      redirect_to @survey
    else
      raise
      redirect_to new_survey_path
      # message
    end
  end

  def show
  end

  def update_session
    @question_id = params[:question_id]
    @score = params[:score].to_i
    session[:answers_attributes][@question_id] = @score
    set_total_scores
  end

  private

  def survey_params
    params.require(:survey).permit(:email, answers_attributes: [:score, :question_id, :_destroy])
  end

  def set_total_scores
    session_qids = session[:answers_attributes].map{|k, v| k.to_i}
    @total_scores = QuestionsCategory.all.map do |questions_category|
      category_qids = questions_category.questions.map(&:id)
      total_score = (category_qids & session_qids).size * 100 / category_qids.size
      [ questions_category.title, total_score ]
    end.to_h
  end
end
