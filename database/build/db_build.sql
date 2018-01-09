BEGIN;

DROP TABLE IF EXISTS engineers CASCADE;

CREATE TABLE engineers (
  id                    SERIAL       PRIMARY KEY,
  full_name             VARCHAR                 ,
  worked_yesterday      BOOLEAN                 ,
  worked_today          BOOLEAN                 ,
  workingLimitReached   BOOLEAN
);

INSERT INTO engineers
  (full_name, worked_yesterday, worked_today, workingLimitReached)
VALUES
  ('Malinda Mannion', false, false, false),
  ('Bud Bjork', false, false, false),
  ('Jarrett Jett', false, false, false),
  ('Cassaundra Couts', false, false, false),
  ('Ashli Applebee', false, false, false),
  ('Myrtice Manfre', false, false, false),
  ('Eugenie Etherton', false, false, false),
  ('Madge Mcginty', false, false, false),
  ('Assunta Austin', false, false, false),
  ('Madlyn Moncada', false, false, false);

COMMIT;
