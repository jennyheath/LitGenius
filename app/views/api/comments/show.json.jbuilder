# json.author_id @comment.author_id
json.author_name @comment.author.username
json.body @comment.body

json.current_user_vote @comment.votes.find_by(user_id: current_user.id)
json.current_user current_user

json.votes do
  json.array! @comment.votes do |vote|
    json.extract! vote, :id, :user_id, :value
  end
end
