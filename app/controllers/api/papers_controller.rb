class Api::PapersController < ApplicationController
  before_action :require_signed_in!

  def new
    @paper = Paper.new
  end

  def create
    @paper = Paper.new(paper_params)
    @paper.assign_attributes(author_id: current_user.id)

    if @paper.save
      render json: @paper
      # render :show?
    else
      render json: @paper.errors.full_messages, status: 402
    end
  end

  def index
    if params[:search_params]
      search_string = params[:search_params]
      @papers = Paper.find_by_sql ["SELECT
                                   papers.id, papers.title
                                   FROM
                                   papers
                                   LEFT OUTER JOIN
                                   author_taggings ON author_taggings.paper_id = papers.id
                                   LEFT OUTER JOIN
                                   authors ON authors.id = author_taggings.author_id
                                   LEFT OUTER JOIN
                                   field_taggings ON field_taggings.paper_id = papers.id
                                   LEFT OUTER JOIN
                                   fields ON fields.id = field_taggings.field_id
                                   LEFT OUTER JOIN
                                   institution_taggings ON institution_taggings.paper_id = papers.id
                                   LEFT OUTER JOIN
                                   institutions ON institutions.id = institution_taggings.institution_id
                                   LEFT OUTER JOIN
                                   journal_taggings ON journal_taggings.paper_id = papers.id
                                   LEFT OUTER JOIN
                                   journals ON journals.id = journal_taggings.journal_id
                                   WHERE
                                   (papers.title LIKE ?)
                                    OR (fields.name LIKE ?)
                                    OR (institutions.name LIKE ?)
                                    OR (journals.name LIKE ?)
                                    OR (authors.name LIKE ?)",
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%']
      render json: @papers
    end
  end

  def show
    @paper = Paper.includes(comments: :author, annotations: :author).find(params[:id])
  end

  private
  def paper_params
    params.require(:paper).permit(:title, :body, :author_id)
  end
end
