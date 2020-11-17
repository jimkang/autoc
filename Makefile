test:
	node tests/basictests.js

pushall:
	git push origin master && npm publish

prettier:
	prettier --single-quote --write "**/*.js"

start-notebooks:
	cd meta && jupyter-lab
