# wmm_test_stage2
## Demo

## Stack
FastAPI, Next.js

## Development
### Run backend
```
uvicorn src.main:app --reload
```

### Run frontend
```
npm run dev
```

## Deploy using Vercel
### Prerequisites
Install Vercel (for deployment from the terminal):
```
npm i -g vercel
```

### Deploy FastAPI via Vercel
1. Create requirements.txt:
```
pip freeze > requirements.txt
```
2. Create `vercel.json` file with this data:
```
{
    "builds": [
      {"src": "/src/main.py", "use": "@vercel/python"}
    ],
    "routes": [
      {"src": "/(.*)", "dest": "src/main.py"}
    ]
}
```
3. Deploy:

From Vercel UI:
- create new project
- choose the repository
- select `"/backend"` as a root folder
- deploy

From terminal:
- open the terminal
- run from the `"/backend"` folder:
```
vercel .
```

If the deployment fails, one of the possible reasons could be the usage of `"str | None"` instead of `"Optional[str]"`. After the first deployment I got HTTP status code 500, and after this fix it worked.


### Deploy Next.js via Vercel
1. Create new project in Vercel UI
2. Select `"Next.js"` as "Framework preset" and `"/frontend"` as a root directory
3. Set environment variable `"NEXT_PUBLIC_BACKEND_BASE_URL"` to the deployed backend URL
4. Click "Deploy" button
5. (in the backend project) Set environment variable `"FRONTEND_URL"` to the deployed frontend URL
