from flask import Flask
app = Flask(__name__)

@app.route("/")
def main():
    return "Welcome to our Networking App! Currently in Progress by Jessica Alberto, Vinay Khemlani, and Cole Johnson"

if __name__ == "__main__":
    app.run()
