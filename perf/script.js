import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 500 }, // ramp up to 1000 users
    { duration: '20s', target: 500 }, // stay at 1000 users
    { duration: '30s', target: 0 }, // ramp down to 0 users
  ],
  thresholds: {
    'http_req_failed': ['rate<0.01'], // less than 1% of requests should fail
  },
};

export default function() {
  http.get('http://localhost:3000/');
  sleep(1);
}
