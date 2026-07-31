// FAQ-Accordion aus index.html.

export interface FaqItem {
  /** enthält HTML (<span class="text-orange">…</span>) */
  question: string;
  /** Ein Eintrag pro <p> im Accordion-Body */
  answer: string[];
}

export const FAQS_CONTENT: FaqItem[] = [
  {
    question: 'How do <span class="text-orange">kite lessons</span> work?',
    answer: [
      "In principle, a package of 12 hours is split in 4/3 hours per day, but we could change them depending on the weather conditions and students’ abilities. Sometimes there are students who want to do a little more and do 3-hour class.",
      "Another more intense option is to do two 2-hour sessions in a day with a break between them. Everything as long as the weather conditions allow it.",
    ],
  },
  {
    question:
      'How long it takes to be an <span class="text-orange">independent</span> Kitesurfer?',
    answer: [
      "The time it takes to become an independent kitesurfer varies, but many people achieve it after 8 to 13 hours of lessons. Consistent practice and favorable wind conditions also contribute to the learning process.",
    ],
  },
  {
    question: '<span class="text-orange">Private</span> Lesson (1 Person)',
    answer: [
      "Private kitesurf class is where you’ll learn in the fastest and most safe way, because you’ll have 100% of the instructors’ attention. The instructor will be exclusively with you and will fully adapt to your needs and your level.",
      "Your kitesurfing class includes a helmet radio communication system, in which you can talk to your kitesurfing instructor at all times, even if you are in the water. It is the most recommended option if you want to learn kitesurfing as quickly as possible or if you come alone.",
    ],
  },
  {
    question: '<span class="text-orange">Semi-Private</span> Lesson (2 Persons)',
    answer: [
      "Semi-private kitesurfing class is for 2 people, each student will have equipment for themselves, which is the maximum number of kites that an instructor can control simultaneously. In the semi-private class your instructor will be teaching two people at the same time, so both of you must have a similar level.",
      "In this class you progress quite quickly but it is not as efficient as a private lesson. It is the most recommended option if two people come together, you want to progress quickly and have a cheaper class than the private one.",
    ],
  },
];
