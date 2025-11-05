export const generateTeamMembers = () => {
  const roles = ["Media", "Tech", "Manager", "Design"];
  const titles = {
    Media: ["Content Creator", "Social Media Manager", "Video Editor", "Photographer"],
    Tech: ["Frontend Developer", "Backend Developer", "DevOps Engineer", "Mobile Developer"],
    Manager: ["Project Manager", "Product Manager", "Team Lead", "Operations Manager"],
    Design: ["UI/UX Designer", "Graphic Designer", "Brand Designer", "Motion Designer"]
  };
  
  const firstNames = ["Alex", "Sarah", "Marcus", "Priya", "James", "Emma", "Ryan", "Sophia", "Michael", "Olivia", "Daniel", "Ava", "David", "Mia", "Chris", "Isabella"];
  const lastNames = ["Chen", "Martinez", "Johnson", "Patel", "Brown", "Garcia", "Davis", "Rodriguez", "Wilson", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright"];
  
  const members = [];
  
  for (let i = 1; i <= 70; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const title = titles[role][Math.floor(Math.random() * titles[role].length)];
    
    members.push({
      id: i,
      name: `${firstName} ${lastName}`,
      title: title,
      role: role,
      handle: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      status: Math.random() > 0.2 ? "Active" : "Away",
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop`,
      batch: `Batch ${Math.floor((i - 1) / 10) + 1}`
    });
  }
  
  return members;
};