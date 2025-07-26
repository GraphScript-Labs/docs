const orgName = "GraphScript-Labs";
const repo = "guidebook";
const branch = "main";
const apiUrl = "https://api.github.com";

const githubUrl = `${apiUrl}/repos/${orgName}/${repo}/branches/${branch}`;

export const getTree = async () => {
  const repoDetailResp = await fetch(githubUrl);
  const repoDetail = await repoDetailResp.json();

  const treeUrl = repoDetail.commit.commit.tree.url;
  const treeResp = await fetch(`${treeUrl}?recursive=1`);
  const treeData = await treeResp.json();
  
  return treeData.tree;
};

export const remoteUrl = (path) => {
  return `https://github.com/${orgName}/${repo}/blob/${branch}/${path}`;
}

