// Testimonials aus dem Swiper in index.html (identisch auf allen Unterseiten).

export interface TestimonialItem {
  name: string;
  text: string;
  /** Anzahl gefuellter Sterne im jeweiligen Slide */
  rating: number;
}

export const TESTIMONIALS_CONTENT: TestimonialItem[] = [
  {
    name: "Frederic Dapper",
    text: "Best kite school. Simo and Marouan are very friendly and were able to explain kiting to me very well, so that I could already ride on the edge on the second day. They are also mobile, i.e. they pick you up at the hotel and drive you to the spot that is best suited for beginners. Shukran",
    rating: 5,
  },
  {
    name: "Damir Huskic",
    text: "Best mobile kitesurfing school and great instructors. They are patient, knowledgeable and take you to the most beautiful spots. We also went to lunch and dinner together which made it a more personal experience. Really great people, can't wait to come back!",
    rating: 5,
  },
  {
    name: "Brahim Bac",
    text: "I had a great experience, the instructors were knowledgeable, patient and made learning to kiteboard a lot of fun. The facilities were first class and the location couldn't have been better. I highly recommend it to anyone who wants to learn kitesurfing or improve their skills!”",
    rating: 5,
  },
  {
    name: "Asaad Ezzaher",
    text: "I spent a week with Othmane learning to kite from scratch. He is not only a great instructor, observer and kiter, but also a professional trip planner who took care of everything from airport transfers, accommodation, food and equipment. Thank you Othmane!",
    rating: 5,
  },
  {
    name: "Claudia Schmitz",
    text: "The equipment was of the highest quality. Very friendly and competent instructors with incredible patience with beginners. You can see their passion for kitesurfing. Highly recommended!",
    rating: 5,
  },
];
