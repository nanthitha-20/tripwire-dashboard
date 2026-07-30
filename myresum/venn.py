import matplotlib.pyplot as plt
import numpy as np

roles    = ['IT', 'Data Science', 'Web Dev', 'Manager']
skills   = {
    'Coding / Hackathons': [90, 55, 65, 20],
    'ML / Python':         [50, 95, 40, 15],
    'HTML / JS':           [60, 35, 95, 10],
    'Leadership':          [25, 30, 25, 90],
}
colors = ['#534AB7', '#1D9E75', '#BA7517', '#993C1D']

x     = np.arange(len(roles))
width = 0.18
fig, ax = plt.subplots(figsize=(10, 6))

for i, (skill, vals) in enumerate(skills.items()):
    bars = ax.bar(x + i * width, vals, width, label=skill,
                  color=colors[i], edgecolor='white', linewidth=0.7)
    for b in bars:
        ax.text(b.get_x() + b.get_width() / 2,
                b.get_height() + 1.5, f"{int(b.get_height())}",
                ha='center', va='bottom', fontsize=8, color='#444')

ax.set_xticks(x + width * 1.5)
ax.set_xticklabels(roles, fontsize=12)
ax.set_ylabel("Weight (%)", fontsize=11)
ax.set_ylim(0, 110)
ax.set_title("Role-Based Evaluation Model", fontsize=14, fontweight="bold")
ax.legend(fontsize=10, framealpha=0.4)
ax.spines[['top', 'right']].set_visible(False)
ax.grid(axis='y', alpha=0.2)
plt.tight_layout()
plt.savefig("role_evaluation_bar.png", dpi=150, bbox_inches="tight")
plt.show()