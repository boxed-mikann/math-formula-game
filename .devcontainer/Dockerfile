FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

# Use root to install additional packages, then switch back to the provided 'vscode' user.
USER root

# Install common tooling that may be useful during development. The base image already
# contains Node.js and common helpers tailored for VS Code devcontainers.
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    curl \
    build-essential \
    python3 \
    pkg-config \
  && rm -rf /var/lib/apt/lists/*

# Create workspace directory and ensure ownership is set to the 'vscode' user that the
# devcontainer base image provides.
ARG USERNAME=vscode
# Create workspace directory. Some base-image stages may not have the 'vscode' user
# available yet during multi-stage builds used by the devcontainers CLI; avoid
# failing the build by checking for the user before attempting chown.
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
# Ensure the 'vscode' user exists in the image; some base-image stages used by the
# devcontainers CLI may not create the user until a later stage, so create it here
# if missing. Use a safe check to avoid errors when the user already exists.
RUN if ! id -u ${USERNAME} >/dev/null 2>&1; then \
    groupadd --gid ${USER_GID} ${USERNAME} || true && \
    useradd -m -s /bin/bash --uid ${USER_UID} --gid ${USER_GID} ${USERNAME} || true; \
  else \
    echo "user ${USERNAME} already exists"; \
  fi

# Create workspace directory and make it writable by the vscode user if available.
RUN mkdir -p /workspace \
  && if id -u ${USERNAME} >/dev/null 2>&1; then \
    chown ${USERNAME}:${USERNAME} /workspace; \
  else \
    echo "user ${USERNAME} not found, skipping chown"; \
  fi

# As a fallback, ensure /etc/passwd and /etc/group contain an entry for the vscode
# user (some multi-stage base images used by the devcontainers tooling may not
# preserve a user entry in all stages). This avoids "unable to find user vscode"
# errors when Docker runs the container as that user.
RUN if ! getent passwd ${USERNAME} >/dev/null 2>&1; then \
    echo "${USERNAME}:x:${USER_UID}:${USER_GID}:${USERNAME}:/home/${USERNAME}:/bin/bash" >> /etc/passwd; \
  fi \
  && if ! getent group ${USERNAME} >/dev/null 2>&1; then \
    echo "${USERNAME}:x:${USER_GID}:" >> /etc/group; \
  fi \
  && mkdir -p /home/${USERNAME} \
  && chown -R ${USER_UID}:${USER_GID} /home/${USERNAME} || true

WORKDIR /workspace

# Switch to non-root user (the base image provides 'vscode'). This avoids the "unable to find user vscode"
# issue when VS Code attempts to start a container as that user.
USER ${USERNAME}

# Keep a sane PATH for any user-installed npm globals
ENV PATH=/home/${USERNAME}/.npm-global/bin:$PATH

# Default to an interactive shell; VS Code will open the container and run its init steps.
CMD ["/bin/bash"]
