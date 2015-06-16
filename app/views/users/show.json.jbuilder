json.id @user.id
json.username @user.username

# json.papers do
#   json.array! Paper.where(author_id: @user.id) do |paper|
#     json.extract! paper, :author_id, :title
#   end
# end
#
# json.annotations do
#   json.array! Annotation.where(author_id: @user.id) do |annotation|
#     json.extract! annotation, :id, :body
#   end
# end

json.activities do
  json.array! @activities do |activity|
    # if typeof activity === Paper
    json.extract! activity, :id
    # end
  end
end
