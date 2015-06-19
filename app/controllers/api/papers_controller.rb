class Api::PapersController < ApplicationController
  before_action :require_signed_in!

  def new
    @paper = Paper.new
  end

  def create
    @paper = Paper.new(paper_params)
    @paper.assign_attributes(user_id: current_user.id)

    @paper.institution = Institution.find_or_create(params[:paper][:institution])
    @paper.journal = Journal.find_or_create(params[:paper][:journal])
    @paper.field = Field.find_by(name: params[:paper][:field])
    @authors = params[:paper][:authors].split(", ")
    @authors.each do |author_name|
      author = Author.find_or_create(author_name)
      @paper.authors << author
    end

    if @paper.save
      render json: @paper
    else
      render json: @paper.errors.full_messages, status: 402
    end
  end

  def index
    if params[:search_params]
      search_string = params[:search_params]

      sql_str = <<-SQL
        SELECT
        papers.*
        FROM
        papers
        LEFT OUTER JOIN
        author_taggings ON author_taggings.paper_id = papers.id
        LEFT OUTER JOIN
        authors ON authors.id = author_taggings.author_id
        LEFT OUTER JOIN
        fields ON fields.id = papers.field_id
        LEFT OUTER JOIN
        institutions ON institutions.id = papers.institution_id
        LEFT OUTER JOIN
        journals ON journals.id = papers.journal_id
        WHERE
        (papers.title LIKE ?)
        OR (fields.name LIKE ?)
        OR (institutions.name LIKE ?)
        OR (journals.name LIKE ?)
        OR (authors.name LIKE ?)
      SQL

      @papers = Paper.find_by_sql([sql_str,
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%',
                                   '%' + search_string + '%']).uniq
      render :index
    elsif params[:field]
      field = params[:field]
      if field == "BiologicalSciences"
        @papers = Paper.find_by_sql ["SELECT
                                      *
                                      FROM
                                      papers
                                      WHERE
                                      field_id = 1
                                      OR field_id = 2
                                      OR field_id = 3
                                      OR field_id = 4
                                      OR field_id = 5
                                      OR field_id = 6
                                      OR field_id = 7
                                      OR field_id = 8
                                      OR field_id = 9
                                      OR field_id = 21"]
      elsif field == "ChemicalSciences"
        @papers = Paper.find_by_sql ["SELECT
                                      *
                                      FROM
                                      papers
                                      WHERE
                                      field_id = 10
                                      OR field_id = 11
                                      OR field_id = 12
                                      OR field_id = 13
                                      OR field_id = 14"]
      elsif field == "PhysicalSciences"
        @papers = Paper.find_by_sql ["SELECT
                                      *
                                      FROM
                                      papers
                                      WHERE
                                      field_id = 15
                                      OR field_id = 16
                                      OR field_id = 22"]
      elsif field == "Mathematics"
        @papers = Paper.find_by_sql ["SELECT
                                      *
                                      FROM
                                      papers
                                      WHERE
                                      field_id = 17
                                      OR field_id = 18
                                      OR field_id = 19
                                      OR field_id = 20"]
      end
      render :index
    end
  end

  def field

  end

  def show
    @paper = Paper.includes(comments: :user, annotations: :user).find(params[:id])
    @comments = Comment.find_by_sql ["SELECT
                                      comments.*, SUM(votes.value) AS vote_count
                                      FROM
                                      comments
                                      LEFT OUTER JOIN
                                      votes ON comments.id = votes.comment_id
                                      WHERE
                                      comments.commentable_type = 'Paper' AND comments.commentable_id = ?
                                      GROUP BY
                                      comments.id, comments.body
                                      ORDER BY
                                      vote_count DESC",
                                      params[:id]]
    @comments.each do |comment|
      if comment.vote_count.nil?
        comment.vote_count = 0
      end
    end
    @comments.sort! {|a, b| b.vote_count <=> a.vote_count}
  end

  def destroy
    @paper = Paper.find(params[:id])
    @paper.delete
    render json: {}
  end

  private
  def paper_params
    params.require(:paper).permit(:title, :body, :user_id)
  end
end
