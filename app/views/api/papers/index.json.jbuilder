# json.papers do
  json.array! @papers do |paper|
    json.extract! paper, :id, :title
    json.authors do
      json.array! paper.authors do |author|
        json.extract! author, :id, :name
      end
    end
    json.institution_name paper.institution.name
    json.journal_name paper.journal.name
  end
# end
