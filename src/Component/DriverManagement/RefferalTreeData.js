// ReferralTreeData.js
export const treeData = {
  name: "Top User",
  image: "/images/top-user.jpg", // path to image
  children: [
    {
      name: "User A",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      children: [
        { name: "User A1", image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" },
        { name: "User A2", image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" },
        { name: "User A2", image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" },
      ],
    },
    {
      name: "User B",
      image: "/images/user-b.jpg",
      children: [
        { name: "User B1", image: "/images/user-b1.jpg" },
        { name: "User B2", image: "/images/user-b2.jpg", 
           children: [
            { name: "User B3a", image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg" },
            { name: "User B3b", image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
               children: [
            { name: "User B3a", image: "/images/user-b3a.jpg" },
            { name: "User B3b", image: "/images/user-b3b.jpg" },
            { name: "User B3b", image: "/images/user-b3b.jpg" },
          ],
             },
            { name: "User B3b", image: "/images/user-b3b.jpg" },
          ],
        },
        {
          name: "User B3",
          image: "/images/user-b3.jpg",
        },
      ],
    },
    {
      name: "User C",
      image: "/images/user-c.jpg",
      children: [
        { name: "User C1", image: "/images/user-c1.jpg" },
        { name: "User C2", image: "/images/user-c2.jpg" },
        { name: "User C2", image: "/images/user-c2.jpg" },
      ],
    },
  ],
};
