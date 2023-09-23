create:
	# Create Python virtual environment
	python3 -m venv devenv

activate:
	# Activate virtual environment
	source devenv/bin/activate

setup: create activate

install:
	# Install dependencies
	# This should be run from inside a virtual env
	pip install --upgrade pip && pip install -r requirements.txt

lint:
	# Linter for Dockerfile
	hadolint Dockerfile
	# Linter for Python source code
	pylint app.py

all: install lint
