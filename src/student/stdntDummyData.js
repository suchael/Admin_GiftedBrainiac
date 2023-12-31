export const dummyData = Array.from({ length: 300 }, (_, index) => {
  const isPaid = index % 2 === 0;
  const isPresent = index % 2 === 0;
  const isScience = Math.random() < 0.33;
  const isArt = Math.random() >= 0.33 && Math.random() < 0.66;
  const isCommercial = Math.random() >= 0.66;

  const imageURL = isScience
    ? "https://media.istockphoto.com/id/1301253705/photo/studio-portrait-of-a-man-in-a-suit.jpg?s=612x612&w=0&k=20&c=qPEvWSUC6u_APo5xw097cM50-_a7miciLDy2DdW7JKc="
    : isArt
    ? "https://storage.prompt-hunt.workers.dev/clfm90a2n000kii08kmr4wg7o_1"
    : "https://img.freepik.com/premium-photo/handsome-african-american-young-man-smiling_33839-3301.jpg";
  const contact = Math.floor(Math.random() * 9000000000) + 1000000000; // Generate a random 10-digit number

  return {
    id: (index + 21).toString(),
    name: `Dummy Name ${index + 21}`,
    feb: isPaid ? "Paid" : "Unpaid",
    session: index % 3 === 0 ? "MRN" : index % 3 === 1 ? "AFT" : "HYB",
    today: isPresent ? "present" : "absent",
    contact: contact.toString(),
    Type:
      index % 3 === 0
        ? "Daily Payment"
        : index % 3 === 1
        ? "Weekly Payment"
        : "Monthly Payment",
    department: isScience ? "Science" : isArt ? "Art" : "Commercial",
    imageURL,
  };
});

// export const dummyData = [
//   {
//     id: "1",
//     name: "John Doe Ahmed Success suchael",
//     feb: "Paid",
//     session: "MRN",
//     today: "present",
//     contact: "1234567890",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "https://media.istockphoto.com/id/1301253705/photo/studio-portrait-of-a-man-in-a-suit.jpg?s=612x612&w=0&k=20&c=qPEvWSUC6u_APo5xw097cM50-_a7miciLDy2DdW7JKc=",
//   },
//   {
//     id: "2",
//     name: "Jane Doe",
//     feb: "Unpaid",
//     session: "AFT",
//     today: "absent",
//     contact: "9876543210",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "https://storage.prompt-hunt.workers.dev/clfm90a2n000kii08kmr4wg7o_1",
//   },
//   {
//     id: "3",
//     name: "Alice Smith",
//     feb: "Paid",
//     session: "MRN",
//     today: "present",
//     contact: "5678901234",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "https://img.freepik.com/premium-photo/handsome-african-american-young-man-smiling_33839-3301.jpg",
//   },
//   {
//     id: "4",
//     name: "Bob Johnson",
//     feb: "Unpaid",
//     session: "AFT",
//     today: "absent",
//     contact: "6789012345",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "5",
//     name: "Eva Davis",
//     feb: "Paid",
//     session: "HYB",
//     today: "present",
//     contact: "8901234567",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
//   {
//     id: "6",
//     name: "Chris Brown",
//     feb: "Unpaid",
//     session: "HYB",
//     today: "absent",
//     contact: "0123456789",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "",
//   },
//   {
//     id: "7",
//     name: "Grace White",
//     feb: "Paid",
//     session: "MRN",
//     today: "present",
//     contact: "2345678901",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "8",
//     name: "David Miller",
//     feb: "Unpaid",
//     session: "AFT",
//     today: "absent",
//     contact: "3456789012",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
//   {
//     id: "9",
//     name: "Sophia Taylor",
//     feb: "Paid",
//     session: "MRN",
//     today: "present",
//     contact: "4567890123",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "",
//   },
//   {
//     id: "10",
//     name: "Andrew Wilson",
//     feb: "Unpaid",
//     session: "HYB",
//     today: "absent",
//     contact: "5678901234",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "11",
//     name: "Olivia Moore",
//     feb: "Paid",
//     session: "AFT",
//     today: "present",
//     contact: "6789012345",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
//   {
//     id: "12",
//     name: "Daniel Clark",
//     feb: "Unpaid",
//     session: "MRN",
//     today: "absent",
//     contact: "7890123456",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "",
//   },
//   {
//     id: "13",
//     name: "Lily Baker",
//     feb: "Paid",
//     session: "HYB",
//     today: "present",
//     contact: "8901234567",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "14",
//     name: "Michael Turner",
//     feb: "Unpaid",
//     session: "AFT",
//     today: "absent",
//     contact: "9012345678",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
//   {
//     id: "15",
//     name: "Ava Hall",
//     feb: "Paid",
//     session: "MRN",
//     today: "present",
//     contact: "0123456789",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "",
//   },
//   {
//     id: "16",
//     name: "Ryan Harris",
//     feb: "Unpaid",
//     session: "HYB",
//     today: "absent",
//     contact: "1234567890",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "17",
//     name: "Emma Collins",
//     feb: "Paid",
//     session: "AFT",
//     today: "present",
//     contact: "2345678901",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
//   {
//     id: "18",
//     name: "William Adams",
//     feb: "Unpaid",
//     session: "MRN",
//     today: "absent",
//     contact: "3456789012",
//     Type: "Monthly Payment",
//     department: "Commercial",
//     imageURL: "",
//   },
//   {
//     id: "19",
//     name: "Chloe Foster",
//     feb: "Paid",
//     session: "HYB",
//     today: "present",
//     contact: "4567890123",
//     Type: "Daily Payment",
//     department: "Science",
//     imageURL: "",
//   },
//   {
//     id: "20",
//     name: "Jackson Moore",
//     feb: "Unpaid",
//     session: "AFT",
//     today: "absent",
//     contact: "5678901234",
//     Type: "Weekly Payment",
//     department: "Art",
//     imageURL: "",
//   },
// ];
