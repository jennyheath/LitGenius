json.id @annotation.id
json.author_name @annotation.user.username
json.body @annotation.body
json.user_id @annotation.user_id
json.paper_id @annotation.paper_id

json.comments do
  json.array! @comments do |comment|
    json.extract! comment, :id, :vote_count
  end
end
