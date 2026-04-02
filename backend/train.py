import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# Column names
columns = [
    "age","sex","cp","trestbps","chol","fbs","restecg",
    "thalach","exang","oldpeak","slope","ca","thal","target"
]

# Load dataset (put file in same folder)
df = pd.read_csv("processed.cleveland.data", names=columns)

# Handle missing values
df = df.replace("?", pd.NA)
df = df.dropna()
df = df.apply(pd.to_numeric)

# Convert target to binary
df["target"] = df["target"].apply(lambda x: 1 if x > 0 else 0)

# Split
X = df.drop("target", axis=1)
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# Accuracy
print("Accuracy:", model.score(X_test, y_test))

# Save model
pickle.dump(model, open("model/model.pkl", "wb"))

print("Model saved ✅")