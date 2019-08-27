start:
	node dist/bin/gendiff.js

lint:
	npx eslint .

test:
	npx jest
