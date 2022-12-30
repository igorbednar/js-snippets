const workQueue = (numOfWorkers) => {
    const queue = [];
    let currentWorkers = 0;

    const processJobs = async () => {
        while (queue.length > 0) {
            const job = queue.shift();
            console.log('Process job');
            await job();
        }
    };

    return {
        addJob: async (job) => {
            queue.push(job);
            if (currentWorkers >= numOfWorkers) {
                return;
            }
            currentWorkers++;
            await processJobs();
            currentWorkers--;
        }
    }
}

const myQueue = workQueue(1);
const arr = [1, 2, 3, 4, 5];
arr.forEach((element) => {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('This is element ' + element);
            resolve();
        }, 500);
    });
    myQueue.addJob(async () => { await promise });
});

// const anotherQueue = workQueue(10);
// arr.forEach((element) => {
//     var promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('This is element ' + element);
//             resolve();
//         }, 500);
//     });
//     anotherQueue.addJob(async () => { await promise });
// });