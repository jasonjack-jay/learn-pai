<figure class="my-8">
	<svg
		viewBox="0 0 760 160"
		class="w-full block rounded-xl border border-gray-200 shadow-sm"
		style="background-color: #030712"
		aria-label="Git flow overview: commit, branch, push, merge"
	>
		<!-- Main track line -->
		<line x1="40" y1="60" x2="720" y2="60" stroke="#6b7280" stroke-width="3"/>

		<!-- Feature branch: forks at x=280, runs parallel, merges at x=620 -->
		<line x1="280" y1="60" x2="340" y2="110" stroke="#818cf8" stroke-width="3"/>
		<line x1="340" y1="110" x2="560" y2="110" stroke="#818cf8" stroke-width="3"/>
		<line x1="560" y1="110" x2="620" y2="60" stroke="#818cf8" stroke-width="3"/>

		<!-- Main track commits -->
		<circle cx="80"  cy="60" r="9" fill="#4b5563"/>
		<circle cx="160" cy="60" r="9" fill="#4b5563"/>
		<circle cx="240" cy="60" r="9" fill="#4b5563"/>
		<circle cx="280" cy="60" r="9" fill="#4b5563"/>
		<circle cx="620" cy="60" r="11" fill="#10b981"/>
		<circle cx="700" cy="60" r="9" fill="#4b5563"/>

		<!-- Feature branch commits -->
		<circle cx="420" cy="110" r="9" fill="#818cf8"/>
		<circle cx="500" cy="110" r="9" fill="#818cf8"/>

		<!-- Labels -->
		<text x="80"  y="38" text-anchor="middle" font-size="11" fill="#9ca3af" font-family="system-ui, sans-serif">commit</text>
		<text x="280" y="38" text-anchor="middle" font-size="11" fill="#a5b4fc" font-family="system-ui, sans-serif">branch</text>
		<text x="460" y="138" text-anchor="middle" font-size="11" fill="#a5b4fc" font-family="system-ui, sans-serif">feature work</text>
		<text x="620" y="38" text-anchor="middle" font-size="11" fill="#6ee7b7" font-family="system-ui, sans-serif">merge</text>
		<text x="40" y="56" font-size="11" fill="#6b7280" font-weight="600" font-family="system-ui, sans-serif">main</text>
	</svg>
	<figcaption class="text-center text-xs text-gray-400 mt-2">
		The full git story: commit, branch, do work, merge back
	</figcaption>
</figure>
