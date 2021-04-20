const { storage } = require("../db/storage")

const createListings = async (users) => {
  const listings = [
    {
      id: "10",
      owner: users?.[0]?.username || "lebron",
      location: "France",
      title: "Modern home on the French Riviera",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/AutCiGUz8D4",
      image:
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
      image2:
        "https://images.unsplash.com/photo-1567599672391-17b31d92e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      image3:
        "https://images.unsplash.com/photo-1533044309907-0fa3413da946?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      price: 23825,
      currency: "USD",
    },
    {
      id: "21",
      owner: users?.[0]?.username || "lebron",
      location: "United States",
      title: "Artist's workshop in Detroit, Michigan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/6DqRIISLZMQ",
      image:
        "https://images.unsplash.com/photo-1505081598304-3bee85f930d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2702&q=80",
      image2:
        "https://images.unsplash.com/photo-1534511902651-6ab0ce131f2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80",
      image3:
        "https://images.unsplash.com/photo-1524061511843-fd43443e3cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      price: 10392,
      currency: "USD",
    },
    {
      id: "26",
      owner: users?.[0]?.username || "lebron",
      location: "Singapore",
      title: "Skyline views in Singapore",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "",
      image:
        "https://images.unsplash.com/photo-1533052494972-63e07f31e2a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
      image2:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80",
      image3:
        "https://images.unsplash.com/photo-1555912881-1ecd82307e0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
      price: 38297,
      currency: "USD",
    },
  ]

  for (let listing of listings) {
    storage.get("listings").push(listing).write()
  }

  const moreListings = [
    {
      id: "11",
      owner: users?.[1]?.username || "serena",
      location: "Mexico",
      title: "Sunny studio in Mexico City",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/ear8VOL7x8k",
      image:
        "https://images.unsplash.com/photo-1537304119-36263d2db05b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
      image2:
        "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      image3:
        "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      price: 15492,
      currency: "USD",
    },
    {
      id: "6",
      owner: users?.[1]?.username || "serena",
      location: "Denmark",
      title: "Light-filled loft in Copenhagen",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/leDo7IX1ycM",
      image:
        "https://images.unsplash.com/photo-1549488497-256795402cc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      image2:
        "https://images.unsplash.com/photo-1529426509-7b7a0e04062f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
      image3:
        "https://images.unsplash.com/photo-1495292312634-1531ba4dc949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      price: 17442,
      currency: "USD",
    },
    {
      id: "12",
      owner: users?.[1]?.username || "serena",
      location: "United States",
      title: "Oasis in Palm Springs, California",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/CIMbOMUewH8",
      image:
        "https://images.unsplash.com/photo-1540321975033-2fff3a5a3945?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80",
      image2:
        "https://images.unsplash.com/photo-1574876999742-a8be3a43f151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      image3:
        "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      price: 19523,
      currency: "USD",
    },
    {
      id: "15",
      owner: users?.[1]?.username || "serena",
      location: "Norway",
      title: "Light, airy home in Oslo, Norway",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/5i0GnoTTjSE",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1946&q=80",
      image2:
        "https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2590&q=80",
      image3:
        "https://images.unsplash.com/photo-1562778357-58e2feebe9aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2707&q=80",
      price: 29382,
      currency: "USD",
    },
    {
      id: "18",
      owner: users?.[1]?.username || "serena",
      location: "Spain",
      title: "Spacious retreat in Mallorca, Spain",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/4ojhpgKpS68",
      image:
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80",
      image2:
        "https://images.unsplash.com/photo-1534595038511-9f219fe0c979?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      image3:
        "https://images.unsplash.com/photo-1568385155229-d533acca4f96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      price: 36419,
      currency: "USD",
    },
    {
      id: "23",
      owner: users?.[1]?.username || "serena",
      location: "Greece",
      title: "Luxury, waterfront views in Santorini, Greece",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/aapSemzfsOk",
      image:
        "https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
      image2:
        "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      image3:
        "https://images.unsplash.com/photo-1508957999498-e7a5e89ba28a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
      price: 424293,
      currency: "USD",
    },
    {
      id: "24",
      owner: users?.[1]?.username || "serena",
      location: "New Zealand",
      title: "Cottage getaway outside of Auckland, New Zealand",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/DI5eFSYszy0",
      image:
        "https://images.unsplash.com/photo-1520190282873-afe1285c9a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2281&q=80",
      image2:
        "https://images.unsplash.com/photo-1464288550599-43d5a73451b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2272&q=80",
      image3:
        "https://images.unsplash.com/photo-1504624720567-64a41aa25d70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80",
      price: 21039,
      currency: "USD",
    },
    {
      id: "25",
      owner: users?.[1]?.username || "serena",
      location: "United States",
      title: "Hollywood, California home in the heart of it all",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/PEaAKHpBTzw",
      image:
        "https://images.unsplash.com/photo-1554094830-addc7e887420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
      image2:
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80",
      image3:
        "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2248&q=80",
      price: 19382,
      currency: "USD",
    },
    {
      id: "27",
      owner: users?.[1]?.username || "serena",
      location: "Canada",
      title: "Modern, poolside retreat in Vancouver, Canada",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim purus, et sodales eros ligula non lacus. Maecenas lacinia nibh at semper efficitur. Fusce tincidunt, mi non tincidunt faucibus, neque velit hendrerit tortor, non fermentum nisi tortor at dui.",
      source: "https://unsplash.com/photos/V7HWR5o9BeY",
      image:
        "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      image2:
        "https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      image3:
        "https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
      price: 22382,
      currency: "USD",
    },
  ]

  for (let listing of moreListings) {
    storage.get("listings").push(listing).write()
  }

  return [...listings, ...moreListings]
}

module.exports = { createListings }