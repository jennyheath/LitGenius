# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
penname         | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
is_author       | boolean   | not null

## works
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
author-id       | integer   | not null, foreign key
body            | text      | not null
genre           | string    |

## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (author of annotation)
work_id     | integer   | not null, foreign key
body        | text      | not null
excerpt     | text      | not null (the exact line being annotated)
up_votes    | integer   |
down_votes  | integer   |

## comments
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
author_id     | integer   | not null, foreign key (author of comment)
annotation_id | integer   | not null, foreign key
body          | text      | not null