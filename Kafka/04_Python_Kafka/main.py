# main.py
# Takes user input and stores email in a text file

FILE_NAME = "emails.txt"

def main():
    print("Enter emails (type 'exit' to quit):")
    while True:
        email = input("Email: ").strip()
        if email.lower() == "exit":
            break
        if email:
            with open(FILE_NAME, "a") as f:
                f.write(email + "\n")
            print(f"Saved email: {email}")

if __name__ == "__main__":
    main()
