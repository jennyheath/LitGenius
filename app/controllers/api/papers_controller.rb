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
                                      papers.*
                                      FROM
                                      papers
                                      LEFT OUTER JOIN
                                      fields ON papers.field_id = fields.id
                                      WHERE
                                      fields.name = 'Biochemistry'
                                      OR fields.name = 'Bioengineering'
                                      OR fields.name = 'Bioinformatics'
                                      OR fields.name = 'Biophysics'
                                      OR fields.name = 'Cell Biology'
                                      OR fields.name = 'Epidemiology'
                                      OR fields.name = 'Genetics'
                                      OR fields.name = 'Molecular Biology'
                                      OR fields.name = 'Neurobiology'
                                      OR fields.name = 'Physiology'"]
      elsif field == "ChemicalSciences"
        @papers = Paper.find_by_sql ["SELECT
                                      papers.*
                                      FROM
                                      papers
                                      LEFT OUTER JOIN
                                      fields ON papers.field_id = fields.id
                                      WHERE
                                      fields.name = 'Chemistry'
                                      OR fields.name = 'Chemical Engineering'
                                      OR fields.name = 'Inorganic Chemistry'
                                      OR fields.name = 'Organic Chemistry'
                                      OR fields.name = 'Physical Chemistry'"]
      elsif field == "PhysicalSciences"
        @papers = Paper.find_by_sql ["SELECT
                                      papers.*
                                      FROM
                                      papers
                                      LEFT OUTER JOIN
                                      fields ON papers.field_id = fields.id
                                      WHERE
                                      fields.name = 'Geophysics'
                                      OR fields.name = 'Physics'
                                      OR fields.name = 'Astrophysics'"]
      elsif field == "Mathematics"
        @papers = Paper.find_by_sql ["SELECT
                                      papers.*
                                      FROM
                                      papers
                                      LEFT OUTER JOIN
                                      fields ON papers.field_id = fields.id
                                      WHERE
                                      fields.name = 'Topology'
                                      OR fields.name = 'Abstract Algebra'
                                      OR fields.name = 'Geometry'
                                      OR fields.name = 'Number Theory'"]
      end
      render :index
    elsif params[:institution]
      sql_str = <<-SQL
        SELECT
        papers.*
        FROM
        papers
        LEFT OUTER JOIN
        institutions ON papers.institution_id = institutions.id
        WHERE
        institutions.id = ?
      SQL
      @papers = Paper.find_by_sql([sql_str, params[:institution]])
    elsif params[:journal]
      sql_str = <<-SQL
        SELECT
        papers.*
        FROM
        papers
        LEFT OUTER JOIN
        journals ON papers.journal_id = journals.id
        WHERE
        journals.id = ?
      SQL
      @papers = Paper.find_by_sql([sql_str, params[:journal]])
    elsif params[:author]
      sql_str = <<-SQL
        SELECT
        papers.*
        FROM
        papers
        LEFT OUTER JOIN
        author_taggings ON author_taggings.paper_id = papers.id
        LEFT OUTER JOIN
        authors ON authors.id = author_taggings.author_id
        WHERE
        authors.name = ?
      SQL
      @papers = Paper.find_by_sql([sql_str, params[:author]])
    end
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
