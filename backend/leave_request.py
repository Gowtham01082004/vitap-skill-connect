import json
import re

# Function to validate date format
def validate_date(date):
    pattern = r"\d{2} \w+ \d{4}"
    return re.match(pattern, date)

# Function to generate leave request
def generate_leave_request():
    salutation = input("Enter your preferred salutation (Sir/Madam/Recipient's Name): ")
    name = input("Enter your full name: ")
    reg_no = input("Enter your registration number: ")
    reason = input("Enter the reason for leave: ")

    while True:
        start_date = input("Enter the start date of your leave (DD Month YYYY): ")
        if validate_date(start_date):
            break
        print("Invalid date format. Please use 'DD Month YYYY'.")

    while True:
        end_date = input("Enter the end date of your leave (DD Month YYYY): ")
        if validate_date(end_date):
            break
        print("Invalid date format. Please use 'DD Month YYYY'.")

    leave_data = {
        "Full Name": name,
        "Registration Number": reg_no,
        "Reason for Leave": reason,
        "Start Date": start_date,
        "End Date": end_date
    }

    # Save leave request data to JSON
    try:
        with open("leave_request.json", "r") as json_file:
            existing_data = json.load(json_file)
            if not isinstance(existing_data, list):
                existing_data = []
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append(leave_data)

    with open("leave_request.json", "w") as json_file:
        json.dump(existing_data, json_file, indent=4)

    # Print the generated leave request
    email_body = f"""
Respected {salutation},
I am {name} ({reg_no}). I am writing to request your approval for a leave of absence due to a {reason}. 
I plan to take leave from {start_date} to {end_date}.

I kindly request you to approve my leave request.

Thank you for your consideration.

Yours sincerely,  
{name}  
{reg_no}
"""

    print("\nGenerated Leave Request Email:\n")
    print(email_body.strip())

# Run the function
generate_leave_request()
