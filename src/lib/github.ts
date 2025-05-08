export async function getGitHubRepos() {
    const res = await fetch('https://api.github.com/users/manav108-hub/repos ');
    return res.json();
  }