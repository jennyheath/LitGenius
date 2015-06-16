json.author_name @comment.user.username
json.body @comment.body
json.user_id @comment.user_id

json.current_user_vote do
  vote = @comment.votes.find_by(user_id: current_user.id)
  if vote
    json.extract! vote, :id, :value
  else
    nil
  end
end
