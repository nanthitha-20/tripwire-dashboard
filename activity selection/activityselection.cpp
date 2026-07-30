#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Activity {
    int id;
    int start;
    int finish;
};

bool compare(Activity a, Activity b) {
    return a.finish < b.finish;
}

int main() {
    int n;
    cout << "Enter number of activities: ";
    cin >> n;

    vector<Activity> arr(n);
    cout << "Enter start and finish times:\n";
    for (int i = 0; i < n; i++) {
        arr[i].id = i + 1;
        cin >> arr[i].start >> arr[i].finish;
    }

    sort(arr.begin(), arr.end(), compare);

    cout << "\nSelected Activities: ";
    int count = 1;
    int last_finish = arr[0].finish;
    cout << arr[0].id << " ";

    for (int i = 1; i < n; i++) {
        if (arr[i].start >= last_finish) {
            cout << arr[i].id << " ";
            last_finish = arr[i].finish;
            count++;
        }
    }
   
    cout << "\nTotal Count: " << count << endl;
    return 0;
}
