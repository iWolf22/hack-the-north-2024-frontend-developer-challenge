// The information for an event will look like so
// Each event will belong to one of the following types
export type TEvent = {
    id: number;
    name: string;
    event_type: 'workshop' | 'activity' | 'tech_talk';
    permission?: 'public' | 'private';

    start_time: number; // unix timestamp (ms)
    end_time: number; // unix timestamp (ms)

    description?: string; // a paragraph describing the event
    speakers: { name: string }[]; // a list of speakers for the event

    public_url?: string; // a url to display for the general public
    private_url: string; // a url to display for hackers
    related_events: number[]; // a list ids corresponding to related events
};

export default function sortingAlg( inputList: TEvent[], sortBy: Number ) {

    var new_list: TEvent[] = [];


    if (sortBy === 1 || sortBy === 2) {
        while (inputList.length > 0) {
            var largest_val1 = inputList[0].start_time;
            var largest_index = 0;
            for (let i = 0; i < inputList.length; i++) {
                if (largest_val1 < inputList[i].start_time) {
                    largest_val1 = inputList[i].start_time;
                    largest_index = i;
                }
            }
            new_list.push(inputList[largest_index]);
            inputList.splice(largest_index, 1);
        }
    } else if (sortBy === 3 || sortBy === 4) {
        while (inputList.length > 0) {
            var largest_val2 = inputList[0].name;
            var largest_index = 0;
            for (let i = 0; i < inputList.length; i++) {
                if (largest_val2.localeCompare(inputList[i].name) === -1) {
                    largest_val2 = inputList[i].name;
                    largest_index = i;
                }
            }
            new_list.push(inputList[largest_index]);
            inputList.splice(largest_index, 1);
        }
    } else {
        return new_list;
    }

    if (sortBy === 1 || sortBy === 4) {
        return new_list;
    } else {
        return new_list.reverse();
    }
}