# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## papers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
author_id       | integer   | not null, foreign key
body            | text      | not null
institution     | string    | 
journal         | string    |


## fields
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## field_tags
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
paper_id        | integer   | not null
field_id        | integer   | not null

## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (author of annotation)
paper_id    | integer   | not null, foreign key
body        | text      | not null
start_index | integer   | not null (start of annotation)
end_index   | integer   | not null (end of annotation)
up_votes    | integer   |
down_votes  | integer   |

## comments
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
author_id     | integer   | not null, foreign key (author of comment)
annotation_id | integer   | not null, foreign key
body          | text      | not null

## authors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null

## author_papers
(join table)

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
paper_id        | integer   | not null, foreign key
author_id       | integer   | not null, foreign key