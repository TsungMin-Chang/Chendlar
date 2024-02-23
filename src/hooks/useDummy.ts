import { Affair } from "@/lib/types";

// DB TODO:
// 1. "id"
// 2. "order": start from 0
// 3. "userId"
// 4. type: "todo" (will only last one day): add from bottom
// 5. type: "event" (will last multiple days): add from top
// 6. type: "empty" (the difficult case)
// 7. deal with order in backend

type dummyProp = {
  [key: string]: Affair[];
};

export default function useDummy() {
  const dummy: dummyProp = {
    "3/1/2024": [
      {
        id: "aasdfqytrjrytjhherteeadsfqsd",
        userId: "harrypotter",
        title: "event 3",
        color: "#B67F8B",
        type: "event",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 2, 4, 22, 0),
        isDone: false,
        order: 0,
      },
      {
        id: "sandllllllra",
        userId: "harrypotter",
        title: "concert",
        color: "#999897",
        type: "todo",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 1, 1, 4, 0),
        isDone: true,
        order: 1,
      },
      {
        id: "opjppppppppm",
        userId: "harrypotter",
        title: "看書",
        color: "#A24F4F",
        type: "todo",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 1, 1, 9, 30),
        isDone: true,
        order: 2,
      },
      {
        id: "opjppm",
        userId: "harrypotter",
        title: "看劇",
        color: "#9F6747",
        type: "todo",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 1, 1, 21, 30),
        isDone: false,
        order: 3,
      },
      {
        id: "aasdfqesd",
        userId: "harrypotter",
        title: "看電影",
        color: "#AE6E28",
        type: "todo",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 1, 1, 18, 0),
        isDone: false,
        order: 4,
      },
    ],
    "3/2/2024": [
      {
        id: "aasdfqeadsfqsd",
        userId: "harrypotter",
        title: "event 3",
        color: "#B67F8B",
        type: "event",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 2, 4, 22, 0),
        isDone: false,
        order: 0,
      },
    ],
    "3/3/2024": [
      {
        id: "aasdfqasdfeadsfqsd",
        userId: "harrypotter",
        title: "event 3",
        color: "#B67F8B",
        type: "event",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 2, 4, 22, 0),
        isDone: false,
        order: 0,
      },
    ],
    "3/4/2024": [
      {
        id: "aasdxcnvdfghfqeadsfqsd",
        userId: "harrypotter",
        title: "event 3",
        color: "#B67F8B",
        type: "event",
        time1: new Date(2024, 2, 1, 22, 0),
        time2: new Date(2024, 2, 4, 22, 0),
        isDone: false,
        order: 0,
      },
    ],
  };

  return {
    dummy,
  };
}
