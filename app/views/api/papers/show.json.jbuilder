json.title @paper.title
json.body @paper.body
json.annotations do
  json.array! @paper.annotations do |annotation|
    json.extract! annotation, :id, :start_index, :end_index
  end
end
