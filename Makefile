setup:
	# Create Python virtual environment
	python -m venv .devenv
	# Active virtual environment
	source .devenv/Scripts/activate

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
