json.title @paper.title
json.body @paper.body
json.annotations do
  json.array! @paper.annotations do |annotation|
    json.extract! annotation, :id, :start_index, :end_index, :author_id, :body
    json.author_name annotation.author.username
  end
end

json.comments do
  json.array! @comments do |comment|
    json.extract! comment, :id, :body, :author_id, :vote_count
  end
end
# json.paragraphs @paper.body.split("\n")
