#!/usr/bin/env bash
$(> test.sqlite)
cat migrate.sql | sqlite3 test.sqlite
