json.id @annotation.id
json.author_name @annotation.user.username
json.body @annotation.body

json.comments do
  json.array! @comments do |comment|
    json.extract! comment, :id, :vote_count
  end
end
