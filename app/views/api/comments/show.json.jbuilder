json.author_name @comment.user.username
json.body @comment.body

json.current_user_vote do
  vote = @comment.votes.find_by(user_id: current_user.id)
  if vote
    json.extract! vote, :id, :value
  else
    nil
  end
end

# json.vote_count @comment.count_votes
