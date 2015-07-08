json.title @paper.title
json.body @paper.body
json.user_id @paper.user_id
json.username User.find(@paper.user_id).username

json.journal_name @paper.journal.name
json.journal_id @paper.journal.id

json.institution_name @paper.institution.name
json.institution_id @paper.institution.id

json.author_names do
  json.array! @paper.authors.each do |author|
    json.extract! author, :id, :name # names.push(author.name)
  end
end

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
