json.author @annotation.author
json.body @annotation.body
json.comments do
  json.array! @annotation.comments do |comment|
    json.extract! comment, :id, :body, :author_id
    json.author_name comment.author.username
  end
end
