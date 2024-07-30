
export default function AboutUs() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 pt-[20px]">About Us</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          Welcome to Hollybooks! We are passionate about bringing you the best selection of books from around the world. Our mission is to foster a love for reading and provide a platform for book enthusiasts to explore and purchase their favorite books.
        </p>
        <p className="mb-4">
          Our team is dedicated to ensuring a seamless and enjoyable experience for our users. From a wide range of genres to the latest bestsellers, we strive to offer something for every reader.
        </p>
        <p className="mb-4">
          At Hollybooks, we believe in the power of stories to inspire, educate, and entertain. We are committed to supporting authors and publishers by providing a platform where their work can reach a global audience.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Team member 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src="path_to_image" alt="Team Member 1" className="h-32 w-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">John Doe</h3>
            <p className="text-center text-gray-600">CEO</p>
            <p className="text-center mt-2">
              John is the visionary behind Hollybooks, with a passion for literature and technology.
            </p>
          </div>
          {/* Team member 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src="path_to_image" alt="Team Member 2" className="h-32 w-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">Jane Smith</h3>
            <p className="text-center text-gray-600">CTO</p>
            <p className="text-center mt-2">
              Jane leads our technology team, ensuring a smooth and innovative user experience.
            </p>
          </div>
          {/* Team member 3 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src="path_to_image" alt="Team Member 3" className="h-32 w-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">Alice Brown</h3>
            <p className="text-center text-gray-600">Marketing Head</p>
            <p className="text-center mt-2">
              Alice is responsible for our marketing strategies, bringing Hollybooks to a wider audience.
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
}
