json.id @user.id
json.username @user.username

json.activities do
  json.array! @activities do |activity|
    if activity.is_a?(Paper)
      json.extract! activity, :id, :title, :created_at
      json.type "paper"
    elsif activity.is_a?(Annotation)
      json.extract! activity, :id, :body, :created_at, :paper_id
      json.type "annotation"
    elsif activity.is_a?(Comment)
      json.extract! activity, :id, :body, :created_at, :commentable_id, :commentable_type
      json.type "comment"
    end
  end
end
