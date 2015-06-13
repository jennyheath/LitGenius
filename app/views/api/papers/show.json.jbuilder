json.title @paper.title
json.body @paper.body
json.annotations do
  json.array! @paper.annotations do |annotation|
    json.extract! annotation, :id, :start_index, :end_index, :author_id, :body
    json.author_name annotation.author.username
  end
end
json.comments do
  json.array! @paper.comments do |comment|
    json.extract! comment, :id, :body, :author_id
    json.author_name comment.author.username
  end
end
json.paragraphs @paper.body.split("\n")
