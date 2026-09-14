function Events() {
  const categories = [
    "Technical",
    "Cultural",
    "Arts",
    "Gaming"
  ];

  return (
    <section
      id="events"
      className="min-h-screen bg-black text-white px-6 py-32"
    >

      <p className="uppercase tracking-[0.4em] text-sm">
        Explore
      </p>

      <h2 className="text-6xl md:text-9xl font-bold mt-6">
        EVENTS
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-20">

        {categories.map((category) => (
          <div
            key={category}
            className="border border-white/20 p-10 min-h-[250px]
                       flex items-end
                       hover:bg-white hover:text-black
                       transition duration-500"
          >
            <h3 className="text-4xl md:text-6xl font-bold">
              {category}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Events;