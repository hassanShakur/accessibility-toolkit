# Accessibility Toolkit

This is a (soon to be) AI powered accessibility toolkit for websites. Be able to determine how accessible your website is and receive recommendations on how to imrove it for better equality and accessibility.

## Getting started

To get started with this code:

Clone this repository and `cd` into it:

```sh
git clone https://github.com/hassanShakur/accessibility-toolkit.git

cd accessibility-toolkit
```

Change directory into the `server` folder and install the dependencies:

**Terminal 1**

```sh
cd server

npm install
```

Also install python dependencies in the same folder:

```sh
pip install -r requirements.txt
```

In a separate terminal, change directory into the `client` folder and install the dependencies:

**Terminal 2**

```sh
cd client

npm install
```

## Running the code

To run the code, you need to start the server and the client. To start the server, run this in **Terminal 1**:

```sh
npm run dev
```

To start the client, run this in **Terminal 2**:

```sh
npm run dev
```

## Sample UI View

### Home Page

![Home Page](screenshots/home.png)

<br>
<br>

### Sample accessibility report

![Sample accessibility report](screenshots/sample-report.png)

**Note:** This is a work in progress. More features will be added soon, including a better UI and more accessibility checks.
