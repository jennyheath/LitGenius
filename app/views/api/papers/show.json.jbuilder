json.title @paper.title
json.body @paper.body
json.journal_name @paper.journal.name
json.institution_name @paper.institution.name

names = []
@paper.authors.each do |author|
  names.push(author.name)
end
json.author_names names.join(", ")


json.annotations do
  json.array! @paper.annotations do |annotation|
    json.extract! annotation, :id, :start_index, :end_index, :user_id, :body
    json.author_name annotation.user.username
  end
end

json.comments do
  json.array! @comments do |comment|
    json.extract! comment, :id, :body, :user_id, :vote_count
  end
end
# json.paragraphs @paper.body.split("\n")
